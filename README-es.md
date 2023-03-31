## Localización ##

Traducir-en-el-Lugar se localizó usando Traducir-en-el-Lugar. Si hay traducciones que podrían mejorar, por favor envíemelas para corregirlas. ¡Gracias!


**Traducir en el lugar** (TEL) Traducirá el texto resaltado al idioma de destino seleccionado actualmente. TEL funciona con Google Translate y *su propia* clave de Google "Cloud Translation API". Mi entendimiento de su precio (en el momento en que se escribió esto) es que es gratis durante los primeros 500,000 caracteres por mes.

Dado que Google Cloud tiene cientos de servicios, configurar una clave API de Cloud Translation requiere un poco de esfuerzo a través de un laberinto un tanto intrincado, pero he tratado de documentar el proceso a continuación. Debe tomar alrededor de 10 minutos.

El precio de Google Cloud es un poco confuso, por lo que definitivamente debe sentirse cómodo con el precio tal como lo describen (no como lo describo yo) y continuar monitoreando lo que se le cobra (por ejemplo, a través de su "Presupuesto y Alertas" ajuste). [Cloud Translation Precios](https://cloud.google.com/translate/pricing)

![Cómo usar Traducir-en-el-Lugar en 3 pasos](https://ext.runcode.run/tip/readme/TIP_howto.png)

## Preferencias ##

Su clave de Google "Cloud Translate API" debe ingresarse en las preferencias de *Extensión*.

El idioma al que está traduciendo se establece en las preferencias de *Proyecto*. (No detecta automáticamente el idioma de origen en este momento).

También puede configurar los caracteres para que aparezcan antes y después de los bloques de ➡️texto traducido⬅️ (por ejemplo, si desea obtener una traducción aproximada ahora, pero también desea que alguien revise la traducción más tarde).

![Preferencias de idioma del proyecto](https://ext.runcode.run/tip/readme/TIP_project_prefs.png)

## Registrarse para obtener una clave de Google "Cloud Translate API" ##

Cree una cuenta de Google Cloud si aún no tiene una.

Dependiendo de lo que ya haya configurado con Google, los pasos para agregar su API de traducción pueden variar. El proceso es un poco arcano, pero solo debería llevarte 10 minutos. Con suerte, el esquema a continuación es suficiente para que la mayoría de las personas comiencen pero, lamentablemente, no puedo ofrecer soporte técnico si no funciona. (Mi familia me mantiene bastante ocupado en ese frente. :-) )

Si desea probar su clave API, puede sustituirla en esta URL. Si funciona en la URL, debería funcionar en esta extensión. De lo contrario, la clave API no se ha configurado correctamente.

    https://www.googleapis.com/language/translate/v2?key=YOUR_API_KEY&source=en&target=es&q=Hello+World

Para crear una clave de API, comience en [la página de la API de Cloud Translate](https://cloud.google.com/translate/).

- Desde esa página, haga clic en el botón azul grande "Probar traducción gratis". (Es posible que deba iniciar sesión nuevamente, etc.)

- Confirme su país, organización, acepte los términos, verificación de identidad (mensaje de texto).

- Confirme los detalles de pago de la tarjeta de crédito (es posible que no se cobre, pero es necesario para abrir la cuenta).

- Si ve un cuadro de diálogo que muestra "Comience con un tutorial interactivo", haga clic en: "Omitir por ahora".

- Desde el menú de la izquierda (o posiblemente desde el menú desplegable "hamburguesa" en la esquina superior izquierda), haga clic en "API y servicios" > "API habilitadas".

- Si se trata de una cuenta nueva, debe "Iniciar un proyecto" para poner el servicio API de traducción. (Para mí, esto se escindió y nunca volvió. Mostró varios errores del sistema de Google y tuve que comenzar de nuevo).

- Una vez creado su proyecto, vuelva a "API y servicios habilitados". Google parece habilitar una pila de API para comenzar. Los deshabilité todos. (Tedioso. Es más rápido abrir cada servicio en una nueva pestaña y luego revisarlos y deshabilitarlos pestaña por pestaña, ya que la desactivación toma unos segundos cada una).

- Vaya a la Biblioteca de API (si acaba de eliminar todas las demás API, debería solicitarle que vaya allí) y busque la "API de traducción de la nube". Habilítelo y debería llevarlo de vuelta a la configuración de esta API en su cuenta.

- En la pantalla de configuración de la API de Cloud Translate, puede mostrar una alerta que le indica que necesita crear credenciales.

- (NOTA: En retrospectiva, es posible que este siguiente paso no haya sido necesario). Haga clic en el botón azul "crear credenciales" en el banner. Cree credenciales para la API de Cloud Translation, probablemente con las opciones "Datos de la aplicación", "No, no los estoy usando" (pero lea los detalles usted mismo). Asigne un nombre al servicio (p. ej., "traducir"). Haga clic en Listo y se creará una "Cuenta de servicio".

- Haga clic en el enlace "Credenciales" en el panel de navegación izquierdo. En la parte superior de la pantalla, haga clic en el enlace/menú desplegable "Crear credenciales" y seleccione "Clave API" en el menú. Se creará una clave API. **¡Cópialo! Esto es lo que necesita poner en las preferencias de esta extensión para que funcione.**

PASOS ADICIONALES
- Como se indica en el cuadro de diálogo de creación de clave de API, es probable que la clave no tenga restricciones. Es posible que desee hacer clic en "Editar clave API" en ese cuadro de diálogo para restringirlo solo a los servicios que utiliza.

- Puede configurar un monitor de "Presupuesto y Alerta" para que le envíe un correo electrónico cuando se esté acercando a su límite (configuré el mío en $1 porque espero que mi traducción esté dentro del nivel "gratuito").

¡Esperemos que eso haya resultado en una clave API funcional para usted! Creé una cuenta dos veces solo para asegurarme de que los pasos funcionaran de manera consistente, pero si la clave no funciona para usted... Me temo que no sé lo suficiente sobre Google Cloud para sugerir cómo solucionarlo.

## Garantía ##

¡Ninguna! Si bien no se ha hecho nada para comprometer deliberadamente la seguridad de su clave API (que se almacena en texto sin cifrar en las preferencias de esta extensión), o traducir incorrectamente deliberadamente su texto a algo sin sentido o incluso grosero, esas cosas podrían suceder. Al usar esta extensión, usted acepta que cualquier cosa que suceda que no le guste como resultado del uso de Translate in Place no es responsabilidad del desarrollador.
