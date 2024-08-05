<img src="https://i.postimg.cc/9QwWTJfj/booknest-logo-booknest-logo-sky-blue.png" alt="Logo de Booknest" style="width: 25%; height: auto;">

Este proyecto es una app mobile pensada en **Android**, se basa en la idea de un *Book Journal* virtual en el que el usuario puede ingresar sus lecturas terminadas y rellenar datos sobre ellas. El objetivo es poner en práctica los conocimientos adquiridos durante el curso de *Desarrollo de aplicaciones en Coderhouse* y construir una aplicación completa basada en **React Native** y **Expo**.

<div align="center">
  <a href="https://drive.google.com/file/d/1UWwtPF-nBi0WGCyYzAKavOFo40lewrb2/view?usp=drive_link" target="_blank">
    <p>¡Puedes ver una demostración de la app en este link!</p>
  </a>
  <a href="https://drive.google.com/file/d/1UWwtPF-nBi0WGCyYzAKavOFo40lewrb2/view?usp=drive_link" target="_blank">
    <img src="https://i.imgur.com/hsczq2V.gif" alt="Gif inicio de sesión" style="width: 50%; height: auto;">
  </a>
</div>

<hr>

## La app cuenta con

- Sistema de **login** y **signup**, los usuarios no pueden registrarse más de una vez y se **persiste** la sesión en el dispositivo.
- **Publicación** y **actualización** de libros con diferentes campos a completar, incluyendo **imágenes**.
- Los usuarios **solo visualizan** los libros que han subido ellos.
- Lista de **favoritos** donde se añaden los libros a los que les ha dado **5 estrellas**.
- Lista de libros que comparten **género**, para filtrar lo visto según el interés del momento.
- Un sistema de **búsqueda** según coincidencias en: *título, autor, serie, género, formato y calificación*. Al momento de presentar estos resultados, se **ordenan** según la categoría para una respuesta más amigable.
- **Orden cronológico** según la fecha de finalización del libro que se ingrese.

<br>

<table>
  <tr>
    <td><img src="https://i.postimg.cc/rsZykHfK/login.jpg" alt="Screenshot iniciar sesión" style="width: 16.6%;"/></td>
    <td><img src="https://i.postimg.cc/Bnr6bd4F/home.jpg" alt="Screenshot inicio" style="width: 16.6%;"/></td>
    <td><img src="https://i.postimg.cc/8k4j4Km8/book-form.jpg" alt="Screenshot formulario del libro" style="width: 16.6%;"/></td>
    <td><img src="https://i.postimg.cc/wjyM668H/book-detail.jpg" alt="Screenshot detalle del libro" style="width: 16.6%;"/></td>
    <td><img src="https://i.postimg.cc/fTFWq63P/search.jpg" alt="Screenshot búsqueda" style="width: 16.6%;"/></td>
    <td><img src="https://i.postimg.cc/K8MG6JB8/profile.jpg" alt="Screenshot perfil" style="width: 16.6%;"/></td>
  </tr>
</table>

## Instrucciones para ejecutar el proyecto

### A tener en cuenta

Debido a que se presentaron algunas complicaciones en la navegación, recomiendo ingresar a la sección de **Libros** al iniciar sesión y luego ya recorrer la app con tranquilidad. Esto es debido a que hay un cruce entre pantallas que no comparten *Stack Navigator*, por lo que al dirigirse enseguida desde el **Inicio** a los **Detalles del libro** puede que alguna navegación muestre errores. Desconozco como solucionar esto, *¡pero una vez que se ingresa a **Libros** ya no hay problema!*

#### ⚠️ *¡Cuidado! Por seguridad, las variables de entorno no están incluidas en el repositorio, razón por la que no funcionaría el código. Sin embargo, puedes crear las tuyas propias en caso de no contar con el archivo original.*

### Crea un archivo **.env** en la raíz del directorio que contenga las siguientes variables:

```
BASE_URL="your-url"
BASE_AUTH_URL="your-auth-url"
API_KEY="your-api-key"
```

### En caso de clonar el repositorio y tener el archivo con las variables de entorno

1. Clonar el repositorio:

```
git clone https://github.com/lurivriv/booknest-react-native.git
```

2. Navegar al directorio del proyecto:

```
cd booknest-react-native
```

3. Instalar las dependencias requeridas:

```
npm install
```

4. Inicializar la aplicación:

```
npm start
```

5. Elegir un modo en donde abrirlo:

```
- a ⭢ Android Studio. (Debes tenerlo instalado)
- Otro emulador ⭢ Iniciar sesión en Expo y abrir el proyecto
- Celular ⭢ Descargar Expo e iniciar sesión. (Debes estar conectado a la misma red Wi-Fi)
```

6. La aplicación debería iniciarse en tu dispositivo de preferencia:

[¡Recuerda la lista de funcionalidades principales para probarlas!](#la-app-cuenta-con)

## Dependencias trabajadas

A continuación se muestran las *dependencias* que se instalarán en el proyecto, la mayoría de ellas fueron trabajadas durante el curso:

- react
- react-dom
- react-native
- react-native-web
- expo
- expo/metro-runtime
- expo-splash-screen
- react-native-screens
- react-navigation/native
- react-navigation/native-stack
- react-navigation/bottom-tabs
- react-redux
- reduxjs/toolkit
- react-native-picker/picker
- expo-image-picker
- expo-font
- expo-sqlite
- yup

<br>

Otras dependencias fueron añadidas para un mejor *desarrollo y amigabilidad*:

- dotenv
- expo-constants
- react-native-safe-area
- expo-status-bar
- react-native-keyboard
- react-native-community/datetimepicker
- date-fns
- react-native-star-rating
- react-native-toast