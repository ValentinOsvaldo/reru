import React, { useState } from 'react';
import styled from 'styled-components';

import { WindowDropDowns } from 'components';
import dropDownData from './dropDownData';

const letter = `
  Hola Lluvia \n
  Te hice este detalle para que recuerdes que te quiero mucho, y que no por ser solo amigos
  No significa que no pueda hacerte un detalle, tú me dijiste que no es necesario nada mas
  que mi compañía para que te sientas querida, y yo te quiero hacer sentir querida porque no sé
  sí tu ya salgas con alguien mas o alguien mas te haga este tipo de detalles, de igual manera
  no impide que te pueda escribir esto.\n
  Quería agradecerte por este año que hemos estado juntos, aunque no ha sido perfecto me siento mejor
  de conservar tu aprecio. Realmente llegaste de nuevo en un momento en el que no sabía que te necesitaba,
  por eso y mas te lo agradezco.\n
  Perdóname por los malos momentos que te he hecho pasar, sé que no es fácil lidiar conmigo y en especial
  que no es obligatorio, pero sigues aquí, por la razón que sea pero te lo agradezco, espero me entiendas,
  aunque las cosas no son precisamente fáciles a veces, créeme que te quiero mucho por ser quien eres,
  tan única y tan especial, y aun sin eso, te sigo queriendo porque te conozco y sé quien eres, eso
  es realmente un privilegio.\n
  Espero podamos seguir compartiendo tiempo, no convivimos mucho en persona pero ojala se me de la oportunidad.
  Créeme que no me importa cuales sean las circunstancias, te voy a tratar de apoyar siempre que pueda, nunca dudes
  en que te quiero escuchar y ojala te pueda echar la mano.\n
  Solamente eso, te amo en el sentido de como persona, pero eso ya lo sabes de sobra, tal vez, pero igual
  sabes que me gusta recalcar las cosas, porque se trata de brindar la seguridad.\n
  Con cariño, Valen ❤️
`;

export default function Notepad({ onClose }) {
  const [docText, setDocText] = useState(letter);
  const [wordWrap, setWordWrap] = useState(false);

  function onClickOptionItem(item) {
    switch (item) {
      case 'Exit':
        onClose();
        break;
      case 'Word Wrap':
        setWordWrap(!wordWrap);
        break;
      case 'Time/Date':
        const date = new Date();
        setDocText(
          `${docText}${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
        );
        break;
      default:
    }
  }
  function onTextAreaKeyDown(e) {
    // handle tabs in text area
    if (e.which === 9) {
      e.preventDefault();
      e.persist();
      var start = e.target.selectionStart;
      var end = e.target.selectionEnd;
      setDocText(`${docText.substring(0, start)}\t${docText.substring(end)}`);

      // asynchronously update textarea selection to include tab
      // workaround due to https://github.com/facebook/react/issues/14174
      requestAnimationFrame(() => {
        e.target.selectionStart = start + 1;
        e.target.selectionEnd = start + 1;
      });
    }
  }

  return (
    <Div>
      <section className="np__toolbar">
        <WindowDropDowns items={dropDownData} onClickItem={onClickOptionItem} />
      </section>
      <StyledTextarea
        wordWrap={wordWrap}
        value={docText}
        onChange={e => setDocText(e.target.value)}
        onKeyDown={onTextAreaKeyDown}
        spellCheck={false}
      />
    </Div>
  );
}

const Div = styled.div`
  height: 100%;
  background: linear-gradient(to right, #edede5 0%, #ede8cd 100%);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .np__toolbar {
    position: relative;
    height: 21px;
    flex-shrink: 0;
    border-bottom: 1px solid white;
  }
`;

const StyledTextarea = styled.textarea`
  flex: auto;
  outline: none;
  font-family: 'Lucida Console', monospace;
  font-size: 13px;
  line-height: 14px;
  resize: none;
  padding: 2px;
  ${props => (props.wordWrap ? '' : 'white-space: nowrap; overflow-x: scroll;')}
  overflow-y: scroll;
  border: 1px solid #96abff;
`;
