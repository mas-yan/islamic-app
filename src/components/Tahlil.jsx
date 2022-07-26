import { useEffect, useState } from "react";

const fromLocal = JSON.parse(localStorage.getItem('tes') || JSON.stringify({ value: '1301', label: 'KOTA JAKARTA' }));
function Tahlil() {
  const [tes, setTes] = useState(fromLocal)

  useEffect(() => {
    localStorage.setItem('tes', JSON.stringify(tes))
  }, [tes]);
  return (
    <div>
      <button onClick={() => {
        setTes({ value: '111', label: 'dep' })
      }}>Clicked</button>
    </div>
  )
}

export default Tahlil;