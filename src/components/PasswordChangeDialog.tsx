import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PasswordChangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail: string;
}

export function PasswordChangeDialog({ open, onOpenChange, userEmail }: PasswordChangeDialogProps) {
  const [step, setStep] = useState<"password" | "otp">("password");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequestOTP = async () => {
    if (newPassword.length < 6) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu phải có ít nhất 6 ký tự",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu xác nhận không khớp",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Send OTP to email
      const { error } = await supabase.auth.signInWithOtp({
        email: userEmail,
      });

      if (error) throw error;

      toast({
        title: "Mã OTP đã được gửi",
        description: "Vui lòng kiểm tra email của bạn",
      });
      setStep("otp");
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể gửi mã OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndChangePassword = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đủ 6 số OTP",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Verify OTP
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: userEmail,
        token: otp,
        type: 'email',
      });

      if (verifyError) throw verifyError;

      // Change password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) throw updateError;

      toast({
        title: "Thành công",
        description: "Mật khẩu đã được thay đổi",
      });
      
      // Reset form
      setNewPassword("");
      setConfirmPassword("");
      setOtp("");
      setStep("password");
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể xác thực OTP hoặc đổi mật khẩu",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setNewPassword("");
    setConfirmPassword("");
    setOtp("");
    setStep("password");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Đổi mật khẩu</DialogTitle>
        </DialogHeader>
        
        {step === "password" ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">Mật khẩu mới</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu mới"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Mã OTP đã được gửi đến email: {userEmail}
            </p>
            <div className="space-y-2">
              <Label>Nhập mã OTP (6 số)</Label>
              <div className="flex justify-center">
                <InputOTP value={otp} onChange={setOtp} maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Hủy
          </Button>
          {step === "password" ? (
            <Button onClick={handleRequestOTP} disabled={loading}>
              {loading ? "Đang gửi..." : "Gửi mã OTP"}
            </Button>
          ) : (
            <Button onClick={handleVerifyAndChangePassword} disabled={loading}>
              {loading ? "Đang xác thực..." : "Xác nhận"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
