import {View, Input, Textarea, Button} from "@tarojs/components"
import Taro from "@tarojs/taro";
import {useState} from "react";
import Dialog from "./dialog"
import "./addQuestion.less";
export default function AddQuestion(props) {
  const [title, setTitle] = useState("")
  const [des, setDes] = useState("")

  const btnCancel = () => {
    props.closeQuestion();
  }
  const changeTitle = (e) => {
    setTitle(e.target.value)
  }
  const changeDes = (e) => {
    setDes(e.detail.value)
  }
  const submit = () => {
    if (!title || !des) {
      Taro.showToast({
        title: "请完善信息",
        icon: 'error',
        duration: 1000
      })
      return
    } else {
      props.addQuestion({title, des})
    }
    console.log("title=" , title)
    console.log("des=", des)
  }
  return (
    <Dialog>
      <View className="add-question">
        <View className="question-body">
          <Input onInput={changeTitle} placeholder="请输入提问内容" className="question-title"></Input>
          <Textarea onInput={changeDes} placeholder="请输入问题描述" className="question-code"></Textarea>
          <View className="btn-group">
            <Button onClick={submit} className="btn-question ok">确定</Button>
            <Button onClick={btnCancel} className="btn-question cancel">取消</Button>
          </View>
        </View>
      </View>
    </Dialog>
  )
}
