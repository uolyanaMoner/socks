function Banner() {
  const bannerStyle = {
    width: "100%",
    backgroundColor:"#c21719",
    color: "white",
    padding: "0",
    textAlign: "center",
  };

  const headingStyle = {
    fontSize: "1rem",
    fontWeight: "bold",
  };

  return (
    <div style={bannerStyle}>
      <h1 style={headingStyle}>Buy 10 socks and get 50% discount!</h1>
    </div>
  );
}

export default Banner;
