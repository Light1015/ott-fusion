import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const Signout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const doSignout = async () => {
      await supabase.auth.signOut();
      navigate('/auth');
    };
    doSignout();
  }, [navigate]);

  return null;
};

export default Signout;
