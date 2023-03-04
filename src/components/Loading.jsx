function Loading() {
  const pokeLoading =process.env.PUBLIC_URL + "/assets/images/red-loading.gif";
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="loading-title">
          <h1>Loading</h1>
          <svg id="dots" height="30px" viewBox="0 0 132 58" version="1.1" xmlns="http://www.w3.org/2000/svg" >
              <title>dots</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="dots" fill="#261d1f">
                <circle id="dot1"  cx="25" cy="30" r="13"></circle>
                <circle id="dot2"  cx="65" cy="30" r="13"></circle>
                <circle id="dot3"  cx="105" cy="30" r="13"></circle>
            </g>
              </g>
          </svg>
      </div>
      <img src={pokeLoading} alt="Loading..." id="poke-loading" />
    </div>
  );
}

export default Loading;
