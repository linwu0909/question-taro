import { View, Button } from "@tarojs/components";
import { useState, useEffect } from "react";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.less";
import AddQuestion from "./addQuestion";

function getStore(key) {
  let str = Taro.getStorageSync(key);
  if (!str) return [];
  return JSON.parse(str);
}
function setStore(key, obj) {
  let str;
  if (typeof obj === "object") {
    str = JSON.stringify(obj);
  }
  Taro.setStorageSync(key, str);
}

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [questionList, setQuestionList] = useState(getStore("question"));

  const addQuestionShow = () => {
    setShowQuestionModal(true);
  };

  const closeQuestion = () => {
    setShowQuestionModal(false);
  };

  const addQuestion = (question) => {
    questionList.push(question);
    console.log(question);
    setQuestionList(questionList);
    setStore("question", questionList);
    closeQuestion();
  };

  return (
    <View className="index">
      <View className="title">问答模块案例</View>
      <View className="question-list">
        {questionList.map((item, index) => {
          return (
            <View className="question" key={index}>
              <View className="question-title">{item.title}</View>
              <View className="question-des">{item.des}</View>
            </View>
          );
        })}
      </View>
      {showQuestionModal ? (
        <AddQuestion closeQuestion={closeQuestion} addQuestion={addQuestion} />
      ) : null}
      <Button onClick={addQuestionShow} className="question-submit">
        提问
      </Button>
    </View>
  );
}
