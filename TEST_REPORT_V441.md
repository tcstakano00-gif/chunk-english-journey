# v4.0.41 β 検証結果

- 新規UI自動テスト `python test_layout_v441.py`: PASS（375×812・390×844の2サイズ、計16種類以上の画面検査）
- 画面比較画像（冒険・例文学習、各2サイズ）: PASS。正規の基準画像を `visual_baselines_v441/` に保存。RGB各チャンネル差>20のピクセルが総数の0.2%を超えると失敗する方式。
- `python test_journey431.py`: 10/10 PASS
- `python test_popup432.py`: 6/6 PASS
- `python test_compact433.py`: 5/5 PASS
- `node --check journey.js`: PASS
- `quality_lab/verify_audio.py`: PASS（波形検証19ケース・102アサーション）
- `browser_tests.py`: 26/27 PASS、1件は旧バージョン表記の固定判定によるFAIL。
- `verify.js`: 既存テストのうち旧音声・人物設定実装の固定式判定等に不一致あり。全面PASSではないため保留。修正済みと誤認しないこと。
- `test_ui439_additions.py`: 旧32px人物アイコンに依存する期待値は新仕様36pxと不一致。
- `test_ui440.py`: 旧冒険CTA表現の期待値は新仕様と不一致。

## 検証範囲の制限
ブラウザ検証はChromiumのHTML/JS描画で、OSの実マイク・Safari/PWAと同一ではない。人物アイコン画像は、ブラウザ検証時に同梱素材をdata URIとして読み込ませて確認した。自動テストは必要に応じて、確定仕様に合わせて古い期待値を更新すること。
