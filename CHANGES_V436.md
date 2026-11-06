# English Journey v4.0.36 β 変更履歴

## 変更点
- 例文学習・AI会話の「質問／回答」ポップアップを、淡いオレンジ色（#FFF0CF）の背景と濃いオレンジ色（#CF7900）の枠線に変更。
- 選択中の質問／回答ボタンも淡いオレンジ色に変更し、右上のヒントを「タップして練習」から「操作中」に切替。
- ポップアップを閉じた際は色とヒントを通常表示へ復元。
- マイク認識／採点／遷移処理、ゲーム進行データ、設定、学習履歴に変更なし。

## 検証
- browser_tests.py：27/27 PASS
- test_journey431.py：10/10 PASS
- test_popup432.py：6/6 PASS
- test_popup_color436.py：4/4 PASS（375px・390px、例文・AI会話）
- test_adventure_nav435.py：375px・390pxとも PASS
- iPhone実機のマイク動作・PWA表示は未検証。

## 復旧／保存
- 正規版 v4.0.35 βを上書きせず、v4.0.36 βとして別ZIPを発行。
- 同じGitHub Pagesリポジトリ chunk-english-journey へ展開したファイルをアップロード。
- 更新前に学習履歴・設定・進行データをJSONでバックアップ。
