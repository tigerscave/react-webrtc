export const rewriteSdpForV9Codec = sdp => {
  return sdp.replace(
    "m=video 9 UDP/TLS/RTP/SAVPF 96 97 98 99 100 101 102",
    "m=video 9 UDP/TLS/RTP/SAVPF 100 96 97 98 99 101 102"
  );
};
