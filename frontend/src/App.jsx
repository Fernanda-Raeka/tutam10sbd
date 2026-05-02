import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const API_URL = 'https://tutam10sbd.vercel.app/todos';

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;
    try {
      await axios.post(API_URL, { text });
      setText('');
      fetchTodos();
    } catch (error) {
      console.error("Error menambah data:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error menghapus data:", error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#121212', color: '#ffffff', padding: '40px 20px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#1e1e1e', padding: '30px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem', fontWeight: 'bold', color: '#e0e0e0' }}>
          TodoList Simpel Sederhana
        </h1>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tambahkan tugas baru..."
            style={{ 
              flex: 1, 
              padding: '15px', 
              borderRadius: '8px', 
              border: '1px solid #333', 
              backgroundColor: '#2d2d2d', 
              color: '#fff', 
              fontSize: '16px', 
              outline: 'none' 
            }}
          />
          <button
            onClick={addTodo}
            style={{ 
              padding: '0 25px', 
              backgroundColor: '#6366f1',
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontSize: '16px', 
              fontWeight: 'bold',
            }}
          >
            Tambah
          </button>
        </div>

        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {todos.map(todo => (
            <li key={todo.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '16px 20px', 
              backgroundColor: '#2d2d2d', 
              marginBottom: '12px', 
              borderRadius: '8px', 
              borderLeft: '4px solid #6366f1',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)' 
            }}>
              <span style={{ fontSize: '16px', color: '#e0e0e0', wordBreak: 'break-word', marginRight: '15px' }}>
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{ 
                  backgroundColor: 'transparent', 
                  color: '#ef4444',
                  border: '1px solid #ef4444', 
                  padding: '8px 12px', 
                  borderRadius: '6px', 
                  cursor: 'pointer', 
                  fontSize: '14px', 
                  fontWeight: 'bold',
                  minWidth: '80px'
                }}
              >
                Hapus
              </button>
            </li>
          ))}
          
          {todos.length === 0 && (
            <p style={{ textAlign: 'center', color: '#888', marginTop: '20px', fontStyle: 'italic' }}>
              Asik libur yuhuu!!!
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;