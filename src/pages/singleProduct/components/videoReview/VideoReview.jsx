import { Box, Text } from "@mantine/core";
import classes from "./VideoReviewStyle.module.css";
import ReactPlayer from "react-player";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";
import { useEffect, useState } from "react";

export default function VideoReview({src}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // أول مرة
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box className={classes.videoReview}>
      <Box mt={30} className={classes.firstTitle}>
        <Text className={classes.title}>Review product</Text>
      </Box>
      <MediaController
        style={{
          width: "90%",
          aspectRatio: isMobile ? "16/9" : "16/7",
        }}
      >
        <ReactPlayer
          slot="media"
          src={src}
          controls={false}
          style={{
            width: "100%",
            height: "100%",
            "--controls": "none",
          }}
        ></ReactPlayer>
        <MediaControlBar>
          <MediaPlayButton />
          <MediaSeekBackwardButton seekOffset={10} />
          <MediaSeekForwardButton seekOffset={10} />
          <MediaTimeRange />
          <MediaTimeDisplay showDuration />
          <MediaMuteButton />
          <MediaVolumeRange className={classes.media} />
          <MediaPlaybackRateButton className={classes.media} />
          <MediaFullscreenButton />
        </MediaControlBar>
      </MediaController>
    </Box>
  );
}
