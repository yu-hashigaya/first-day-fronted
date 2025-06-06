import React, { useState } from 'react';

const API_ENDPOINT1 = 'https://ytgjm14g77.execute-api.ap-northeast-1.amazonaws.com/function1';
const API_ENDPOINT2 = 'https://ytgjm14g77.execute-api.ap-northeast-1.amazonaws.com/function2';
const API_ENDPOINT3 = 'https://ytgjm14g77.execute-api.ap-northeast-1.amazonaws.com/function3';


function App() {
  const [result, setResult] = useState('結果がここに表示されます');
  const [loadingButton, setLoadingButton] = useState('');

  const callLambda = async (endpoint, buttonId, method = 'GET') => {
    setLoadingButton(buttonId);
    setResult('読み込み中...');
    try {
      let fetchOptions = { method };
      if (method === 'POST') {
        fetchOptions.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        fetchOptions.body = 'name=test';
      }
      const response = await fetch(endpoint, fetchOptions);
      const data = await response.text();
      setResult(data);
    } catch (error) {
      setResult('エラーが発生しました: ' + error.message);
    } finally {
      setLoadingButton('');
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-logo">MicroService</div>
        <div className="user-info">
          <div className="user-icon">S</div>
          Student
        </div>
      </header>

      <div className="main-content">
        <div className="container">
          <h1>AWS Lambda Demo</h1>
          <div className="button-container">
            <button
              onClick={() => callLambda(API_ENDPOINT1, 'b1', 'POST')}
              disabled={loadingButton === 'b1'}
              className={loadingButton === 'b1' ? 'loading' : ''}
            >
              メッセージ1を取得
            </button>
            <button
              onClick={() => callLambda(API_ENDPOINT2, 'b2')}
              disabled={loadingButton === 'b2'}
              className={loadingButton === 'b2' ? 'loading' : ''}
            >
              メッセージ2を取得
            </button>

            <button
              onClick={() => callLambda(API_ENDPOINT3, 'b3')}
              disabled={loadingButton === 'b3'}
              className={loadingButton === 'b3' ? 'loading' : ''}
            >
              メッセージ3を取得
            </button>

          </div>

          <div id="result" className={result !== '' ? 'active' : ''}>
            {result}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
