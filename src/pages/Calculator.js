import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Calculator.module.css';
import { create, all } from 'mathjs';

const Calculator = () => {

  const math = create(all);
  math.import({
    'import':     function () { throw new Error('Function import is disabled') },
    'createUnit': function () { throw new Error('Function createUnit is disabled') },
    'evaluate':   function () { throw new Error('Function evaluate is disabled') },
    'parse':      function () { throw new Error('Function parse is disabled') },
    'simplify':   function () { throw new Error('Function simplify is disabled') },
    'derivative': function () { throw new Error('Function derivative is disabled') }
  }, { override: true })

  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const handleHome = () => {
    navigate('/')
  }

  const handleEvaluate = () => {
    try {
      const result = math.evaluate(value);
      setValue(result.toString());
    } catch (error) {
      // Handle invalid expressions or other errors here
      console.error(error);
      setValue('Error');
    }
  };

  return (
    <div className={styles.container}>
        <div>
            <h1>CALCULATOR</h1>
        </div>
        <div className={styles.calculator}>
            <form className={styles.form}>
                <div className={styles.display}>
                    <input type="text" value={value}/>
                </div>
                <div>
                    <button type="button" value="AC" onClick={e => setValue('')}>AC</button>
                    <button type="button" value="DE" onClick={e => setValue(value.slice(0, -1))}>DE</button>
                    <button type="button" value="." onClick={e => setValue(value + e.target.value)}>.</button>
                    <button type="button" value="/" onClick={e => setValue(value + e.target.value)}>/</button>
                </div>
                <div>
                    <button type="button" value="7" onClick={e => setValue(value + e.target.value)}>7</button>
                    <button type="button" value="8" onClick={e => setValue(value + e.target.value)}>8</button>
                    <button type="button" value="9" onClick={e => setValue(value + e.target.value)}>9</button>
                    <button type="button" value="*" onClick={e => setValue(value + e.target.value)}>*</button>
                </div>
                <div>
                    <button type="button" value="4" onClick={e => setValue(value + e.target.value)}>4</button>
                    <button type="button" value="5" onClick={e => setValue(value + e.target.value)}>5</button>
                    <button type="button" value="6" onClick={e => setValue(value + e.target.value)}>6</button>
                    <button type="button" value="+" onClick={e => setValue(value + e.target.value)}>+</button>
                </div>
                <div>
                    <button type="button" value="1" onClick={e => setValue(value + e.target.value)}>1</button>
                    <button type="button" value="2" onClick={e => setValue(value + e.target.value)}>2</button>
                    <button type="button" value="3" onClick={e => setValue(value + e.target.value)}>3</button>
                    <button type="button" value="-" onClick={e => setValue(value + e.target.value)}>-</button>
                </div>
                <div>
                    <button type="button" value="00" onClick={e => setValue(value + e.target.value)}>00</button>
                    <button type="button" value="0" onClick={e => setValue(value + e.target.value)}>0</button>
                    <button type="button" value="=" id={styles.equal} onClick={handleEvaluate}>=</button>
                </div>
            </form>
        </div>
        <div>
            <button className={styles.homeBtn} onClick={handleHome}>Back to Home</button>
        </div>
    </div>
  )
}

export default Calculator;