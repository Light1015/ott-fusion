import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Verify the requesting user is an admin
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Missing authorization header')
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)

    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    // Check if user has admin role
    const { data: roleData, error: roleError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle()

    if (roleError || !roleData) {
      throw new Error('Unauthorized: Admin access required')
    }

    const url = new URL(req.url)
    const action = url.searchParams.get('action')
    const userId = url.searchParams.get('userId')

    // List all users
    if (action === 'list' || !action) {
      const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers()

      if (listError) {
        throw listError
      }

      return new Response(
        JSON.stringify({ users }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get user details
    if (action === 'details' && userId) {
      const { data: { user: userDetails }, error: detailsError } = await supabaseAdmin.auth.admin.getUserById(userId)

      if (detailsError) {
        throw detailsError
      }

      return new Response(
        JSON.stringify({ user: userDetails }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Ban user
    if (action === 'ban' && userId) {
      const { error: banError } = await supabaseAdmin.auth.admin.updateUserById(
        userId,
        { ban_duration: '876000h' } // 100 years
      )

      if (banError) {
        throw banError
      }

      return new Response(
        JSON.stringify({ success: true, message: 'User banned successfully' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Unban user
    if (action === 'unban' && userId) {
      const { error: unbanError } = await supabaseAdmin.auth.admin.updateUserById(
        userId,
        { ban_duration: 'none' }
      )

      if (unbanError) {
        throw unbanError
      }

      return new Response(
        JSON.stringify({ success: true, message: 'User unbanned successfully' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Delete user
    if (action === 'delete' && userId) {
      const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId)

      if (deleteError) {
        throw deleteError
      }

      return new Response(
        JSON.stringify({ success: true, message: 'User deleted successfully' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    throw new Error('Invalid action')

  } catch (error) {
    console.error('Error in admin-users function:', error)
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})