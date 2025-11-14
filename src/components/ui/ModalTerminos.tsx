"use client";

import React from "react";
import { Package, Scale, Tag, XCircle } from "lucide-react";
import Image from "next/image";

interface ModalTerminosProps {
    open: boolean;
    onClose: () => void;
    onAccept: () => void;
}

export default function ModalTerminos({ open, onClose, onAccept }: ModalTerminosProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[90%] max-w-lg shadow-2xl border border-blue-100 relative overflow-hidden">
                {/* ✖ Botón de cierre */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                    <XCircle className="w-5 h-5" />
                </button>

                {/* Título */}
                <h2 className="text-2xl font-semibold text-wash-primary mb-4 text-center">
                    Términos y Condiciones del Pedido
                </h2>

                <p className="text-gray-700 text-sm leading-relaxed mb-6 text-center">
                    Antes de confirmar tu pedido, por favor revisá cómo preparar tus prendas
                    correctamente para el retiro.
                </p>

                {/* Bloques visuales con íconos */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col items-center p-3 border border-blue-100 rounded-xl bg-blue-50">
                        <Package className="w-8 h-8 text-wash-primary mb-2" />
                        <p className="text-sm text-center text-gray-700 font-medium">
                            Embolsá tus prendas
                        </p>
                        <p className="text-xs text-center text-gray-500">
                            Usá la bolsa reglamentaria WashApp.
                        </p>
                    </div>

                    <div className="flex flex-col items-center p-3 border border-blue-100 rounded-xl bg-blue-50">
                        <Tag className="w-8 h-8 text-wash-primary mb-2" />
                        <p className="text-sm text-center text-gray-700 font-medium">
                            Colocá el código
                        </p>
                        <p className="text-xs text-center text-gray-500">
                            Pegá el número de pedido afuera de la bolsa.
                        </p>
                    </div>

                    <div className="flex flex-col items-center p-3 border border-blue-100 rounded-xl bg-blue-50">
                        <Scale className="w-8 h-8 text-wash-primary mb-2" />
                        <p className="text-sm text-center text-gray-700 font-medium">
                            Peso permitido
                        </p>
                        <p className="text-xs text-center text-gray-500">
                            Hasta <b>8 kg</b> por bolsa.
                        </p>
                    </div>

                    <div className="flex flex-col items-center p-3 border border-blue-100 rounded-xl bg-blue-50">
                        <Image
                            src="/img/no-humedo.png"
                            alt="No prendas húmedas"
                            width={28}
                            height={28}
                            className="mb-2 opacity-90"
                        />
                        <p className="text-sm text-center text-gray-700 font-medium">
                            Prendas secas
                        </p>
                        <p className="text-xs text-center text-gray-500">
                            No se aceptan prendas húmedas o sueltas.
                        </p>
                    </div>
                </div>

                {/* Imagen demostrativa */}
                <div className="flex justify-center mb-6">
                    <Image
                        src="/img/bolsa-washapp.png"
                        alt="Bolsa reglamentaria WashApp"
                        width={220}
                        height={140}
                        className="rounded-lg border border-gray-200 shadow-sm"
                    />
                </div>

                {/* Texto informativo */}
                <p className="text-xs text-gray-500 text-center mb-5 px-4">
                    Aceptar estos términos confirma que tu pedido cumple con las condiciones
                    y está listo para ser retirado según las normas de WashApp.
                </p>

                {/* Botones */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onAccept}
                        className="px-4 py-2 rounded-lg bg-wash-primary text-white font-medium hover:bg-wash-primary/90 transition"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
}
