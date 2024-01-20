import { TbPokeball, TbPokeballOff, TbVolume, TbVolumeOff } from "react-icons/tb";

function BottomButtons(props) {
  const pokeFleche = process.env.PUBLIC_URL + "/assets/images/icons8-flèche-vers-le-haut-48.png";

  return (
    <div className="buttons-bottom">
      <button onClick={() => props.setIsMuted(!props.isMuted)} className="button-no-sound me-2">
        {props.isMuted ? (
          <>
            <TbPokeball />
            <TbVolumeOff className="volume" />
          </>
        ) : (
          <>
            <TbPokeballOff /> <TbVolume className="volume" />
          </>
        )}
      </button>
      <button onClick={props.goTop} style={{ display: props.visible ? "inline" : "none" }} className="button-go-top">
        <img src={pokeFleche} alt="" />
      </button>
    </div>
  );
}

export default BottomButtons;
