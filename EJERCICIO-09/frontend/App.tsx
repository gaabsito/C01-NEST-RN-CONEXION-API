import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

const API_URL = 'http://localhost:3019';

type Heroe = {
  id: number;
  nombre: string;
  poder: string;
  universo: string;
};

export default function App() {
  const [id, setId] = useState('');
  const [heroe, setHeroe] = useState<Heroe | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const buscarHeroe = async () => {
    const idBuscado = id.trim();

    setHeroe(null);
    setError('');

    if (!/^[1-9]\d*$/.test(idBuscado)) {
      setError('Introduce un ID entero mayor que cero.');
      return;
    }

    setCargando(true);

    try {
      const respuesta = await fetch(
        `${API_URL}/heroes/${idBuscado}`,
      );

      if (respuesta.status === 404) {
        setError('No existe un héroe con ese ID.');
        return;
      }

      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }

      const datos: Heroe = await respuesta.json();
      setHeroe(datos);
    } catch {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>🦸 Busca un héroe</Text>

        <Text style={styles.ayuda}>
          Introduce un ID: prueba con 1, 2 o 3.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="ID del héroe"
          accessibilityLabel="ID del héroe"
          keyboardType="number-pad"
          value={id}
          onChangeText={setId}
          editable={!cargando}
        />

        <Button
          title={cargando ? 'Buscando…' : 'Buscar'}
          onPress={buscarHeroe}
          disabled={cargando}
        />

        {cargando && (
          <ActivityIndicator
            style={styles.indicador}
            size="large"
            color="#2563eb"
          />
        )}

        {error !== '' && (
          <Text style={styles.error}>{error}</Text>
        )}

        {heroe && (
          <View style={styles.tarjeta}>
            <Text style={styles.nombre}>{heroe.nombre}</Text>

            <Text style={styles.etiqueta}>Poder</Text>
            <Text style={styles.dato}>{heroe.poder}</Text>

            <Text style={styles.etiqueta}>Universo</Text>
            <Text style={styles.dato}>{heroe.universo}</Text>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f3f4f6',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  ayuda: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4b5563',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#9ca3af',
    borderRadius: 12,
    padding: 14,
    fontSize: 18,
    marginBottom: 16,
  },
  indicador: {
    marginTop: 24,
  },
  error: {
    color: '#dc2626',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginTop: 24,
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 12,
  },
  etiqueta: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  dato: {
    fontSize: 18,
    marginTop: 4,
  },
});