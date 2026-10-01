import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3020';
type Mascota = { id: number; nombre: string; especie: string; emoji: string; likes: number };

export default function App() {
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [ocupado, setOcupado] = useState(true);
  const [error, setError] = useState('');
  const enCurso = useRef(false);

  async function solicitar(like = false) {
    if (enCurso.current) return;
    enCurso.current = true;
    setOcupado(true);
    setError('');
    try {
      const respuesta = await fetch(`${API_URL}/mascotas/1${like ? '/like' : ''}`, {
        method: like ? 'PATCH' : 'GET',
      });
      if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
      setMascota(await respuesta.json());
    } catch {
      setError('No se pudo conectar. Comprueba el servidor y vuelve a intentarlo.');
    } finally {
      enCurso.current = false;
      setOcupado(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    async function cargarInicial() {
      try {
        const respuesta = await fetch(`${API_URL}/mascotas/1`, { signal: controller.signal });
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        const datos: Mascota = await respuesta.json();
        if (!controller.signal.aborted) setMascota(datos);
      } catch {
        if (!controller.signal.aborted) setError('No se pudo cargar la mascota. Pulsa Recargar mascota.');
      } finally {
        if (!controller.signal.aborted) setOcupado(false);
      }
    }
    void cargarInicial();
    return () => controller.abort();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Mascotas con corazón</Text>
        <Text style={styles.subtitulo}>Dale un me gusta a Luna</Text>
        {mascota && (
          <View style={styles.tarjeta}>
            <Text style={styles.emoji}>{mascota.emoji}</Text>
            <Text style={styles.nombre}>{mascota.nombre}</Text>
            <Text style={styles.subtitulo}>{mascota.especie}</Text>
            <Text accessibilityLiveRegion="polite" style={styles.likes}>❤️ {mascota.likes} likes</Text>
            <Button title="❤️ ME GUSTA" onPress={() => solicitar(true)} disabled={ocupado} color="#be185d" />
          </View>
        )}
        {ocupado && <ActivityIndicator accessibilityLabel="Cargando" style={styles.estado} color="#be185d" />}
        {error !== '' && <Text style={styles.error}>{error}</Text>}
        <Button title="Recargar mascota" onPress={() => solicitar()} disabled={ocupado} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff1f2' },
  titulo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  subtitulo: { fontSize: 16, color: '#6b7280', textAlign: 'center', marginBottom: 16 },
  tarjeta: { backgroundColor: 'white', borderRadius: 20, padding: 28, marginVertical: 24 },
  emoji: { fontSize: 72, textAlign: 'center' },
  nombre: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginTop: 12 },
  likes: { fontSize: 24, textAlign: 'center', marginBottom: 24 },
  estado: { marginBottom: 16 },
  error: { color: '#b91c1c', textAlign: 'center', marginBottom: 16 },
});
