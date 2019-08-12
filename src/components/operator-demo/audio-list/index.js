import React from "react";

const AudioList = () => {
  return (
    <div className="container">
      <h3>オーディオ一覧</h3>
      <div className="content">
        <p>ロボットが接続されていません。</p>
        <p>リモート接続ボタンを押して、ロボットと接続してください。</p>
      </div>
      <style jsx>{`
        .container {
          margin: 4rem 0 6rem 2rem;
        }
        .content {
          margin-top: 2rem;
        }
        .content p {
          margin: 0;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default AudioList;
