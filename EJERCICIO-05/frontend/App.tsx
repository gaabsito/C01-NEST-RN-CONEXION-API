import { useState } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

const API_URL = 'http://localhost:3015';

export default function App() {
  const [mensaje, setMensaje] = useState('Pulsa el botón para conectar');

  const cargarMensaje = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/mensaje`);

      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }

      const datos = await respuesta.json();
      setMensaje(datos.texto);
    } catch {
      setMensaje('No se pudo conectar con el backend');
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Mi primera conexión</Text>
        <Text style={styles.mensaje}>{mensaje}</Text>
        <Button title="Cargar mensaje" onPress={cargarMensaje} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mensaje: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});