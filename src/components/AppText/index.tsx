import i18n from "@app/locales";
import { storeRedux } from "@app/redux/store";
import React, { Component } from "react";
import { TextProps } from "react-native";
import { Text } from "react-native-paper";
import { connect } from "react-redux";

export declare interface AppTextProps extends TextProps {
  textKey?: string;
  languageCode?: string;
}

export declare interface AppTextStates {
  i18n: any;
  languageCode: string;
}

class AppText extends Component<AppTextProps, AppTextStates> {
  private unsubscribe: any;

  constructor(props: AppTextProps) {
    super(props);
    this.state = {
      i18n: i18n,
      languageCode: storeRedux.getState().general.languageCode,
    };

    this.unsubscribe = storeRedux.subscribe(() => {
      const { languageCode } = storeRedux.getState().general;
      if (languageCode !== this.state.languageCode) {
        this.setMainLocaleLanguage(languageCode);
      }
    });
  }

  componentDidMount() {
    const { languageCode } = this.props;
    if (languageCode) this.setMainLocaleLanguage(languageCode);
  }

  componentDidUpdate(prevProps: AppTextProps) {
    const { languageCode } = this.props;
    if (languageCode && languageCode !== prevProps.languageCode) {
      this.setMainLocaleLanguage(languageCode);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  setMainLocaleLanguage = (languageCode: string) => {
    let i18n = this.state.i18n;
    i18n.locale = languageCode;
    this.setState({ i18n, languageCode });
  };

  render() {
    const { textKey, style, children } = this.props;
    const { i18n } = this.state;
    return <Text style={style}>{textKey ? i18n.t(textKey) : children}</Text>;
  }

  static getText(key: string, i18nProps: object = {}) {
    const reduxStore = storeRedux.getState();
    return i18n.t(key, { locale: reduxStore.general.languageCode, ...i18nProps });
  }
}

const mapStateToProps = (state: any) => {
  return {
    language: state.general.languageCode,
  };
};

export default connect(mapStateToProps, null)(AppText);
