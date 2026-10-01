import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3022';
type Criatura = { id: number; nombre: string; nivel: number; poder: number; likes: number; emoji: string };
export default function App() {
  const [criaturas, setCriaturas] = useState<Criatura[]>([]);
  const [id, setId] = useState('');
  const [ocupado, setOcupado] = useState(true);
  const [error, setError] = useState('');
  const enCurso = useRef(false);
  useEffect(() => {
    const c = new AbortController();
    async function iniciar() {
      try {
        const r = await fetch(`${API_URL}/criaturas`, { signal: c.signal });
        if (!r.ok) throw new Error();
        const datos: Criatura[] = await r.json();
        if (!c.signal.aborted) setCriaturas(datos);
      } catch { if (!c.signal.aborted) setError('No se pudo conectar. Pulsa Ver todas.'); }
      finally { if (!c.signal.aborted) setOcupado(false); }
    }
    void iniciar(); return () => c.abort();
  }, []);
  async function consultar(accion: 'todas' | 'buscar' | 'like', criaturaId?: number) {
    if (enCurso.current) return;
    if (accion === 'buscar' && !/^[1-9]\d*$/.test(id.trim())) { setError('Introduce un ID entero mayor que cero.'); return; }
    enCurso.current = true; setOcupado(true); setError('');
    try {
      const ruta = accion === 'todas' ? '' : accion === 'buscar' ? `/${id.trim()}` : `/${criaturaId}/like`;
      const r = await fetch(`${API_URL}/criaturas${ruta}`, { method: accion === 'like' ? 'PATCH' : 'GET' });
      if (r.status === 404) { setCriaturas([]); setError('No existe una criatura con ese ID.'); return; }
      if (!r.ok) throw new Error();
      if (accion === 'todas') { setCriaturas(await r.json()); setId(''); }
      else {
        const dato: Criatura = await r.json();
        setCriaturas((previas) => accion === 'buscar' ? [dato] : previas.map((c) => c.id === dato.id ? dato : c));
      }
    } catch { setError('No se pudo conectar. Vuelve a intentarlo.'); }
    finally { enCurso.current = false; setOcupado(false); }
  }
  return <SafeAreaProvider><SafeAreaView style={styles.screen}>
    <Text style={styles.title}>🧬 Creature Lab</Text>
    <Text style={styles.subtitle}>Explora, busca y apoya a tus criaturas</Text>
    <TextInput style={styles.input} accessibilityLabel="ID de criatura" placeholder="Buscar por ID: 1, 2 o 3" keyboardType="number-pad" value={id} onChangeText={setId} editable={!ocupado} />
    <Button title="Buscar" disabled={ocupado} onPress={() => consultar('buscar')} />
    <Button title="Ver todas" disabled={ocupado} onPress={() => consultar('todas')} />
    {ocupado && <ActivityIndicator accessibilityLabel="Cargando" />}
    {!!error && <Text style={styles.error}>{error}</Text>}
    <FlatList style={styles.list} data={criaturas} keyExtractor={(c) => String(c.id)} renderItem={({ item }) => <View style={styles.card}>
      <Text style={styles.name}>{item.emoji} {item.nombre}</Text>
      <Text style={styles.detail}>ID {item.id} · Nivel {item.nivel} · Poder {item.poder}</Text>
      <Text style={styles.detail} accessibilityLiveRegion="polite">❤️ {item.likes} likes</Text>
      <Button title={`Me gusta ${item.nombre}`} disabled={ocupado} onPress={() => consultar('like', item.id)} />
    </View>} ListEmptyComponent={!ocupado && !error ? <Text>No hay criaturas.</Text> : null} />
  </SafeAreaView></SafeAreaProvider>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#eef2ff', padding: 24 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#1e1b4b', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#475569', marginBottom: 18 },
  input: { backgroundColor: 'white', borderColor: '#94a3b8', borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 12, fontSize: 17 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 20, marginBottom: 14, gap: 10 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#312e81' },
  detail: { fontSize: 17, color: '#334155' },
  error: { color: '#b91c1c', marginVertical: 12 },
  list: { flex: 1, marginTop: 18 },
  notice: { color: '#166534', marginVertical: 12 },
});
