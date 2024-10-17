import './App.css';
import Schedule from './pages/Schedule/Schedule';

interface IData {
  id_driver: number,
  name: string
}

function App() {
  // const [data, setData] = useState<IData[]>([]);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/api/data');
  //       const result: IData[] = await response.json();
  //       setData(result);
  //     } catch (error) {
  //       console.error('Ошибка при получении данных:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <Schedule />

      {/* <div>
      <h1>Данные из бэкенда:</h1>
        {data.map(r=>(
          <div key={r.id_driver}>{r.name}</div>
        ))}
    </div> */}
    </>
  )
}

export default App
