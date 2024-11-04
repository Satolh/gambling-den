import { useState } from 'react'
import { LuDollarSign } from "react-icons/lu";
import { GiPokerHand } from "react-icons/gi";
import { FaXTwitter,FaInstagram,FaGithub, FaTwitter } from "react-icons/fa6";


const arrayCards = [
  "card-Q.png",
  "card-J-T.png",
  "card-J-P.png"
]


function App() {


  const [cash, setCash] = useState(10000)
  const [betActive, setBetActive] = useState([true,true,true])
  const [styleCard, setStyleCard] = useState([true,true,true])
  const [cashBet, setCashBet] = useState()
  const [msjValue,setMsjValue] = useState(null)
  const [win, setWin] = useState(null)
  const [isDisabled,setIsDisabled] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false);
  const [posiciones, setPosiciones] = useState([
    { top: 0, left: 0 },
    { top: 0, left: 200 },
    { top: 0, left: 400},
  ]);

  const handleRotateCard = (index) => {
    switch (index) {
      case 0:
        setBetActive([true,false,false])
        setStyleCard([true,false,false])
        setWin(true)
        setCash(cash + cashBet * 2)
        setIsAnimating(false)
    
    setTimeout(() => {
      setWin(null)
      setStyleCard([true,true,true]);
      setBetActive([true, true, true]);
      setIsDisabled(false)
    }, 2000); 
        break;
      case 1:
        setBetActive([false,true,false])
        setStyleCard([false,true,false])
        setWin(false)
        setIsAnimating(false)
        
        setTimeout(() => {
          setWin(null)
          setStyleCard([true,true,true]);
          setBetActive([true, true, true]);
          setIsDisabled(false)
        }, 2000); 
        break;
      case 2:
        setBetActive([false,false,true])
        setStyleCard([false,false,true])
        setWin(false)
        setIsAnimating(false)

    setTimeout(() => {
      setWin(null)
      setBetActive([true, true, true]);
      setStyleCard([true,true,true]);
      setIsDisabled(false)
    }, 2000); 
        break;
      default:
    }
  };

  const valueBet = (e) =>{
    if(isDisabled === false){
      setCashBet(e.target.value)
      console.log(cashBet)
      console.log(arrayCards)
    }
  }

  const mezclarCartas = () => {

    if(cashBet >= 10 && cashBet <= 10000 && cashBet <= cash ){
      setBetActive([false,false,false])
      setMsjValue(false)
      setCash(cash - cashBet)
      setIsDisabled(true)
      setIsAnimating(true)
      console.log(betActive)

      setTimeout(() => {
        let contador = 0;
        const intervalo = setInterval(() => {
          const nuevasPosiciones = posiciones
          .map(pos => ({ ...pos }))
          .sort(() => Math.random() - 0.5);
        
          setPosiciones(nuevasPosiciones);
          contador++;
          if (contador >= 15) {
            clearInterval(intervalo);
          }
        }, 200);
      }, 500);
    }else{
      setMsjValue(true)
    }
  };

  return (
    <>

    <main className='main'>

      <div className='container-title'>
        <GiPokerHand className='icon-cards' />
        <h1 className='title'>Three Card monte</h1>
      </div>

      <section className='section-gambling'>
          { posiciones.map((pos,index)=>(
            <div className={`div-card ${betActive[index] ? "" : "rotate"} ${isAnimating ? "animate" : ""}`} key={index} style={{ top: `${pos.top}px`, left: `${pos.left}px` }} >
              <div className='card-front'>
                <img src={arrayCards[index]} alt="Carta de Poker" className='img-card'/>
              </div>
              <div className={ styleCard[index] ? "card-back" : "card-back opacity"} onClick={()=>{handleRotateCard(index)}} >
                <img src="https://i.pinimg.com/736x/32/1d/d7/321dd7863cb803d7b5523512b536d0e8.jpg" className='img-card' alt=""/>
              </div>
            </div>
          ))
        }
      </section>
  
    <div className='container-msj-win-lose'>
      { betActive[0] === false && betActive[1] === false && betActive[2] === false &&
        <p className='msj-select-card'>Pick a card, any card!</p>
      }
      { win &&
        <p className='msj-win'>Do you have good eyesight or just luck? Only you know.</p>
      }
      { win === false &&
      <p className='msj-lose'>Poor luck mate, care to try again?</p>
      }
    </div>
  
    <section className='section-info'>
      <p className='cash'> Cash: {cash} $</p>
      <p className='p-info'> Bet must be between $10 and $10.000</p>
      <div className='container-bet'>
        <LuDollarSign className="icon-dolar"/>
        <input type="number"  className='input-bet' onChange={valueBet}/>
        <button className='btn-bet' onClick={mezclarCartas} disabled={isDisabled} >bet</button>
      </div>
      {
        msjValue === true &&
        <div className='container-value-incorrect'>
          <p className='p-msj'>No pudiste apostar.</p>
        </div>
      }
    </section>
    </main>

    <footer className='footer'>

        <div className='container-made'>
            <p className='made'>  Made by Satolh </p>
        </div>
        <div className='container-redes'>
          <a  className='a-icon-redes' href='#'><FaInstagram className='icon-redes' /></a>
          <a  className='a-icon-redes' href='#'><FaTwitter className='icon-redes' /></a>
          <a target='_blank' className='a-icon-redes' href='https://github.com/satolh'><FaGithub className='icon-redes'  /></a>
        </div>

    </footer>
    </>
  )
}

export default App
