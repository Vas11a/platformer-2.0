import React from 'react'
import Table from './Table'
import { field } from './field';
import block from './img/block.jpg'
import stairs from './img/stairs.png'


function App() {


  const [coords, setCoords] = React.useState([320, 320])

  let [fieldHook, setFieldHook] = React.useState(field)
  const [devMode, setDevMode] = React.useState(false)



  React.useEffect(() => {
    const handleKeyPress = (event) => {
      setCoords(([x, y]) => {
        if (event.key === 'A' || event.key === 'a') {
          // return x < 5 ? [x, y] : [x-5, y]
          if (fieldHook[y/20][(x-20)/20] === 'b' || x < 5) {
            return [x, y]
          } else {
            return [x-5, y]
          }
        } else if (event.key === 'D' || event.key === 'd') {
          if (fieldHook[y/20][(x+20)/20] === 'b' || x > 475) {
            return [x, y]
          } else {
            return [x+5, y]
          }
        } else if (event.key === 'W' || event.key === 'w') {
          return goUp([x,y])
        } else if(event.key === 'S' || event.key === 's') {
          return goDown([x,y])
        } else {
          return [x, y]
        }
      })
    };

    setInterval(() => {
      setCoords(([x, y]) => {
        console.log(x/20)
        if (fieldHook[(y+20)/20][Math.floor(x/20)] === 'b' || fieldHook[(y+20)/20][Math.round(x/20)] === 'b' || fieldHook[(y+20)/20][Math.floor(x/20)] === 's' || fieldHook[(y+20)/20][Math.round(x/20)] === 's') {
          return [x,y]
        } else {
          return[x, y+20]
        }
      })
    }, 150)


    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [])


  function goUp(arr) {
    if (fieldHook[arr[1]/20][arr[0]/20] === 's') {
      return [arr[0], arr[1]-20]
    }
    return arr
  }

  function goDown(arr) {
    if (fieldHook[(arr[1]+20)/20][arr[0]/20] === 'b') {
      return arr  
    }
    if (fieldHook[arr[1]/20][arr[0]/20] === 's' || fieldHook[(arr[1]+20)/20][arr[0]/20] === 's') {
      return [arr[0], arr[1]+20]
    }
    return arr
    
  }

  return (
    <div className='wrapper'>
      <div className='container'>
        <div className="player" style={
          {
            top: `${coords[1]}px`,
            left: `${coords[0]}px`,
          }
        } ></div>
        {
          fieldHook.map((row, rowI) =>
            row.map((col, colI) =>
              <div key={[rowI, colI]} style={
                {
                  top: `${rowI * 20}px`,
                  left: `${colI * 20}px`,
                  backgroundImage: col === 'b' ? `url(${block})` : col === 's' ? `url(${stairs})` : ''
                }} className="pixel"></div>
            )
          )
        }
      </div>
      {
        devMode && <Table fieldHook={fieldHook} setFieldHook={setFieldHook} />
      }
      

      <div className='hide' onClick={() => setDevMode(!devMode)}>Hide/show</div>
    </div>
  );
}

export default App;
