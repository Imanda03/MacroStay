import { useFetch } from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error, reFetch } = useFetch(
    "http://localhost:8081/api/hotels/countByCity?cities=Chitwan,Kathmandu,Pokhara"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait..."
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://www.rhinolandchitwan.com/images/2nights/1.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Chitwan</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://assets.vogue.in/photos/5ce431b346cf5953f8b18c74/16:9/pass/featured.2.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Kathmandu</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://risingnepaldaily.com/storage/media/8765/10.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Pokhara</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
