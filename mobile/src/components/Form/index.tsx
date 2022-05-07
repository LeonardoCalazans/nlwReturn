import React, { useState } from "react";
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";
import { ArrowLeft } from "phosphor-react-native";
import * as FileSystem from "expo-file-system";

import { FeedbackType } from "../Widget/";
import { feedbackTypes } from "../../utils/feedbackTypes";

import { styles } from "./styles";
import { theme } from "../../theme";
import { Button } from "../Button";
import { ScreenshotButton } from "../ScreenshotButton";
import { captureScreen } from "react-native-view-shot";
import { api } from "../../libs/Api";

interface FormProps {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSend: () => void;
}

export function Form({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSend,
}: FormProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [comment, setComment] = useState("");
  const feedbackInfo = feedbackTypes[feedbackType];

  const handleScreenshot = () => {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    })
      .then((uri) => setScreenshot(uri))
      .catch((err) => console.log(err));
  };

  const handleScreenshotRemove = () => setScreenshot(null);

  const handleSendFeedback = async () => {
    if (isSendingFeedback) {
      return;
    }
    setIsSendingFeedback(true);
    const screenshotBase64 =
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, { encoding: "base64" }));
    try {
      await api.post("/feedback", {
        type: feedbackInfo.title,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment,
      });
      onFeedbackSend();
    } catch (err) {
      console.log(err);
      setIsSendingFeedback(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight={"bold"}
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleConteiner}>
          <Image style={styles.image} source={feedbackInfo.image} />
          <Text style={styles.titleText}>{feedbackInfo.title}</Text>
        </View>
      </View>
      <TextInput
        multiline
        style={styles.input}
        placeholder={
          "Algo não está funcionando bem? Querendo corrigir. conte detalhes o que está acontecendo?"
        }
        onChangeText={setComment}
        placeholderTextColor={theme.colors.text_secondary}
      />
      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onRemoveShot={handleScreenshotRemove}
          onTakeShot={handleScreenshot}
        />
        <Button isLoading={isSendingFeedback} onPress={handleSendFeedback} />
      </View>
    </View>
  );
}
