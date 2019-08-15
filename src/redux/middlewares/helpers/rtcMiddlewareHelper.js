export const rewriteSdpForV9Codec = sdp => {
  return sdp.replace(
    "m=video 9 UDP/TLS/RTP/SAVPF 96 97 98 99 100 101 102",
    "m=video 9 UDP/TLS/RTP/SAVPF 100 96 97 98 99 101 102"
  );
};

export const convertResolutionToWidth = resolution => {
  switch (resolution) {
    case "HD": {
      return "1280";
    }

    case "VGA": {
      return "640";
    }

    case "QVGA": {
      return "320";
    }

    default: {
      return "320";
    }
  }
};
