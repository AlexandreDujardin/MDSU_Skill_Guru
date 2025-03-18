"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface QRCodeModalProps {
  sessionUrl: string;
  scenarioTitle: string;
}

export function QRCodeModal({ sessionUrl, scenarioTitle }: QRCodeModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variantType="secondary" onClick={() => setOpen(true)} className="flex items-center gap-2">
        <img src="https://xwvfgrzvxtfrolsvnikm.supabase.co/storage/v1/object/sign/games/play_arrow.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJnYW1lcy9wbGF5X2Fycm93LnN2ZyIsImlhdCI6MTc0MjI0NDg1MiwiZXhwIjoxNzczNzgwODUyfQ.L35-p0ljkS157zd02HefgbUrjjkGVlwfizMt89GRoEc" alt="QR" />
        QR-code lancement du jeu
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-6 flex flex-col items-center gap-4 bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary text-center text-text-primary">
              La session de jeu va commencer
            </DialogTitle>
            <p className="text-text-primary text-md text-center">
              Scénario - {scenarioTitle}
            </p>
          </DialogHeader>

          <div className="p-4 border-4 border-primary rounded-lg bg-white">
            <QRCode
              value={sessionUrl}
              size={200}
              bgColor="transparent"
              fgColor="#4C1545"
              className="rounded-lg"
            />
          </div>

          <Button variantType="primary" onClick={() => setOpen(false)} className="mt-4">
            Démarrer le jeu
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
