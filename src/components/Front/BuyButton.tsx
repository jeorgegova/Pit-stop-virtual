"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

type BuyButtonProps = {
  productId: string
}

const BuyButton: React.FC<BuyButtonProps> = ({ productId }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleBuy = () => {
    setModalOpen(true)
  }

  const handleCloseModal = async () => {
    setModalOpen(false)
    setLoading(true)

    try {
      // Simula petición al backend
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // Redirige al home
      router.push("/")
    } catch (error) {
      console.error("Error en la compra:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={handleBuy}
        disabled={loading || modalOpen}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Procesando...
          </>
        ) : (
          "Comprar ahora"
        )}
      </Button>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Compra realizada satisfactoriamente 🎉</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleCloseModal} className="bg-blue-600 hover:bg-blue-700 text-white">
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BuyButton
