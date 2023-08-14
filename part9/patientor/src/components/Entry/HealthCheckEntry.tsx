import {HealthCheckRating, Entry} from "../../types";
import {Box} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

const getHeart = (rating: HealthCheckRating) => {
    switch (rating) {
        case HealthCheckRating.CriticalRisk:
            return <FavoriteIcon htmlColor={"red"}/>
        case HealthCheckRating.HighRisk:
            return <FavoriteIcon htmlColor={"orange"}/>
        case HealthCheckRating.LowRisk:
            return <FavoriteIcon htmlColor={"yellow"}/>
        case HealthCheckRating.Healthy:
            return <FavoriteIcon htmlColor={"green"}/>
    }
}
const HealthCheckEntry = (props: {
    entry: Entry
}) => {
    if ("healthCheckRating" in props.entry) {
        return getHeart(props.entry.healthCheckRating)
    }

    return null;

}

export default HealthCheckEntry;

