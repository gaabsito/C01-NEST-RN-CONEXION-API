import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3021';
type Producto = { id: number; nombre: string; precio: number };
export default function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [ocupado, setOcupado] = useState(true);
  const [error, setError] = useState('');
  const [aviso, setAviso] = useState('');
  const enCurso = useRef(false);
  async function obtener(signal?: AbortSignal): Promise<Producto[]> {
    const r = await fetch(`${API_URL}/productos`, { signal });
    if (!r.ok) throw new Error('No se pudo cargar la tienda.');
    return r.json();
  }
  useEffect(() => {
    const c = new AbortController();
    obtener(c.signal).then((datos) => { if (!c.signal.aborted) setProductos(datos); })
      .catch(() => { if (!c.signal.aborted) setError('No se pudo conectar. Pulsa Recargar.'); })
      .finally(() => { if (!c.signal.aborted) setOcupado(false); });
    return () => c.abort();
  }, []);
  async function actualizar(crear = false) {
    if (enCurso.current) return;
    const valor = Number(precio.replace(',', '.'));
    if (crear && (!nombre.trim() || !precio.trim() || !Number.isFinite(valor) || valor < 0)) {
      setError('Escribe un nombre y un precio válido mayor o igual a cero.'); return;
    }
    enCurso.current = true; setOcupado(true); setError(''); setAviso('');
    try {
      if (crear) {
        const r = await fetch(`${API_URL}/productos`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre: nombre.trim(), precio: valor }),
        });
        if (!r.ok) throw new Error('No se pudo añadir el producto.');
        const nuevo: Producto = await r.json();
        setProductos((anteriores) => [...anteriores, nuevo]);
        setNombre(''); setPrecio(''); setAviso('Producto añadido.');
      }
      setProductos(await obtener());
    } catch (e) { setError(e instanceof Error ? e.message : 'Error de conexión.'); }
    finally { enCurso.current = false; setOcupado(false); }
  }
  return <SafeAreaProvider><SafeAreaView style={styles.screen}>
    <Text style={styles.title}>🛒 Mini tienda</Text>
    <Text style={styles.subtitle}>Añade un producto a tu catálogo</Text>
    <TextInput style={styles.input} accessibilityLabel="Nombre" placeholder="Nombre del producto" maxLength={80} value={nombre} onChangeText={setNombre} editable={!ocupado} />
    <TextInput style={styles.input} accessibilityLabel="Precio" placeholder="Precio en euros" keyboardType="decimal-pad" value={precio} onChangeText={setPrecio} editable={!ocupado} />
    <Button title="Añadir" disabled={ocupado} onPress={() => actualizar(true)} />
    {ocupado && <ActivityIndicator accessibilityLabel="Cargando" />}
    {!!error && <Text style={styles.error}>{error}</Text>}
    {!!aviso && <Text style={styles.notice}>{aviso}</Text>}
    <FlatList style={styles.list} data={productos} keyExtractor={(p) => String(p.id)} renderItem={({ item }) => <View style={styles.card}>
      <Text style={styles.name}>{item.nombre}</Text><Text style={styles.detail}>{item.precio.toFixed(2)} €</Text>
    </View>} ListEmptyComponent={!ocupado && !error ? <Text>No hay productos.</Text> : null} />
    <Button title="Recargar" disabled={ocupado} onPress={() => actualizar()} />
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
