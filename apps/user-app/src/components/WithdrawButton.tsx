import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LuLoader2 } from "react-icons/lu";
import confetti from "canvas-confetti";
import { useToast } from "@/components/ui/use-toast";
import { withdraw } from "@/blockchain/reward.interaction";
import { useEarningsStore } from "@/providers/store/earnings.store";

function WithdrawButton({ onSuccess }: { onSuccess: () => void }) {
  const amount = useEarningsStore((state) => state.earnings);
  const resetEarnings = useEarningsStore((state) => state.resetEarnings);
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  async function handleWithdraw() {
    setIsPending(true);

    try {
      const { data, error } = await withdraw(amount.toString());

      if (error) {
        console.log(error);
        toast({
          title: "Withdrawal Failed",
          description: "An error occurred during withdrawal.",
        });
      } else {
        resetEarnings();
        toast({
          title: "Withdrawal Successful",
          description: "Your withdrawal has been confirmed.",
        });
        fireConfetti(["#B8FF5B", "#FFA41B"]);
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while processing the withdrawal.",
      });
    } finally {
      setIsPending(false);
    }
  }

  function fireConfetti(colors: string[]) {
    const end = Date.now() + 3 * 1000;
    const frame = () => {
      if (Date.now() > end) return;
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      });
      requestAnimationFrame(frame);
    };
    frame();
  }

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={handleWithdraw}
      disabled={isPending}
    >
      {isPending ? (
        <div className="inline-flex items-center gap-2">
          <LuLoader2 className="h-4 w-4 animate-spin" /> Confirm In Your
          Wallet...
        </div>
      ) : (
        "Withdraw Now"
      )}
    </Button>
  );
}

export default WithdrawButton;
