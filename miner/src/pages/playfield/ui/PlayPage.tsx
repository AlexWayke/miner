import PlayField from "@widgets/playField";
import "./style.scss";
import Timer from "@widgets/timer";
import Layout from "@entities/layout";

function PlayPage() {
  return (
    <div className="play-page">
      <Layout>
        <Timer />
        <PlayField />
      </Layout>
    </div>
  );
}

export default PlayPage;
