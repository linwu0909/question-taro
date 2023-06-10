import { View } from "@tarojs/components";
import "./dialog.less";

export default function Dialog(props) {
  return <View className="dialog">{props.children}</View>;
}
