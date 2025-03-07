import React from 'react';
import Nav from '../components/fuba/Nav';
import { Header } from '../styled';

const Privacidad = () => {
    return (
        <div className="min-h-screen bg-blue mx-auto py-12 flex flex-col gap-10 pb-28">
            <div className="container mx-auto px-6">
                <Header className="uppercase !text-white">Política de Privacidad</Header>
                <p className="text-white mt-4">
                    **Última actualización:** 7 de marzo de 2025
                </p>

                <section className="mt-8">
                    <h2 className="text-lightGreen font-semibold">1. Información que recopilamos</h2>
                    <p className="text-white mt-2">
                        Recopilamos información para mejorar tu experiencia en Sparring, incluyendo:
                    </p>
                    <ul className="list-disc pl-5 text-white">
                        <li><b>Datos de cuenta:</b> Nombre, correo electrónico, foto de perfil, fecha de nacimiento.</li>
                        <li><b>Datos de perfil:</b> Nivel de juego, preferencias y disponibilidad.</li>
                        <li><b>Datos de uso:</b> Partidos jugados, interacciones dentro de la app.</li>
                        <li><b>Datos de ubicación:</b> Solo si das tu consentimiento.</li>
                    </ul>
                </section>

                <section className="mt-8">
                    <h2 className="text-lightGreen font-semibold">2. Cómo usamos tu información</h2>
                    <p className="text-white mt-2">
                        Usamos tu información para:
                    </p>
                    <ul className="list-disc pl-5 text-white">
                        <li>Conectar jugadores y facilitar la organización de partidos.</li>
                        <li>Mejorar la experiencia de usuario dentro de la app.</li>
                        <li>Enviar notificaciones importantes o promocionales (puedes desactivarlas).</li>
                        <li>Procesar pagos y reservas de canchas (si aplica).</li>
                    </ul>
                </section>

                <section className="mt-8">
                    <h2 className="text-lightGreen font-semibold">3. Compartición de información</h2>
                    <p className="text-white mt-2">
                        No vendemos tu información. Podemos compartirla con:
                    </p>
                    <ul className="list-disc pl-5 text-white">
                        <li>Otros jugadores para facilitar la conexión en partidos.</li>
                        <li>Proveedores de servicios para pagos, hosting y soporte.</li>
                        <li>Autoridades si es requerido por ley.</li>
                    </ul>
                </section>

                <section className="mt-8">
                    <h2 className="text-lightGreen font-semibold">4. Tus derechos y opciones</h2>
                    <p className="text-white mt-2">
                        Tienes derecho a:
                    </p>
                    <ul className="list-disc pl-5 text-white">
                        <li>Acceder, corregir o eliminar tus datos.</li>
                        <li>Controlar el uso de cookies y notificaciones.</li>
                        <li>Solicitar la eliminación de tu cuenta.</li>
                    </ul>
                </section>

                <section className="mt-8">
                    <h2 className="text-lightGreen font-semibold">5. Seguridad y retención de datos</h2>
                    <p className="text-white mt-2">
                        Protegemos tu información con medidas de seguridad adecuadas. Retenemos datos solo el tiempo necesario para cumplir con nuestras obligaciones legales y mejorar nuestra app.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-lightGreen font-semibold">6. Cambios en la política</h2>
                    <p className="text-white mt-2">
                        Podemos actualizar esta política de vez en cuando. Te notificaremos sobre cambios importantes dentro de la app o a través de correo electrónico.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-lightGreen font-semibold">7. Contacto</h2>
                    <p className="text-white mt-2">
                        Si tienes preguntas sobre esta política, puedes contactarnos en:
                    </p>
                    <p className="text-white font-semibold">sparring@marcopolo.agency</p>
                </section>
            </div>

        </div>
    )
}

export default Privacidad;