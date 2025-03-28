import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RankingView } from "src/components/rankingView";
import { useSearchParams } from "src/hooks/router";
import { useFirebaseFunctions } from "src/hooks/server";
import { GetRankingResponse } from "types";

function Ranking() {
  const params = useSearchParams();
  const term = params.get("term");
  const batch = params.get("batch");
  const className = params.get("class");
  const navigate = useNavigate();
  if (!term || !batch || !className) {
    navigate("/");
    return null;
  }

  const { getRanking } = useFirebaseFunctions();

  const [ranking, setRanking] = useState<GetRankingResponse | null>(null);

  useEffect(() => {
    getRanking(batch, term.toLowerCase(), className).then((data) => {
      setRanking(data);
    });
  }, [batch, term, className]);

  if (!ranking) return <LinearProgress />;

  return (
    <RankingView
      ranking={ranking.data}
      term={term}
      batch={batch}
      classKey={className}
    />
  );
}

export default Ranking;
