import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

const API_URL = 'http://localhost:3018';

type Producto = {
  id: number;
  nombre: string;
  emoji: string;
  precio: number;
};

export default function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargarProductos = async () => {
    setCargando(true);
    setError('');

    try {
      const respuesta = await fetch(`${API_URL}/productos`);

      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }

      const datos: Producto[] = await respuesta.json();
      setProductos(datos);
    } catch {
      setError('No se pudo cargar el menú.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>🍽️ Menú del restaurante</Text>

        {cargando && (
          <View style={styles.estado}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text>Cargando…</Text>
          </View>
        )}

        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <FlatList
          style={styles.lista}
          data={productos}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.tarjeta}>
              <Text style={styles.emoji}>{item.emoji}</Text>

              <View style={styles.detalles}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.precio}>
                  {item.precio.toFixed(2)} €
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            !cargando && !error ? (
              <Text>No hay productos disponibles.</Text>
            ) : null
          }
        />

        <Button
          title="Recargar menú"
          onPress={cargarProductos}
          disabled={cargando}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f3f4f6',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  estado: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  error: {
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 16,
  },
  lista: {
    flex: 1,
    marginBottom: 16,
  },
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
  },
  emoji: {
    fontSize: 40,
    marginRight: 16,
  },
  detalles: {
    flex: 1,
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  precio: {
    fontSize: 18,
    color: '#2563eb',
    marginTop: 6,
  },
});