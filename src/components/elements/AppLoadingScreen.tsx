import { theme } from "@chakra-ui/react";
import TextEffect from "components/shared/TextEffect";
import { loadingContainerVars, loadingContentVars } from "constants/animation";
import { INIT_LOADING_CONTENT } from "constants/app";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/root-reducer";
import { AppDispatch } from "redux/root-store";
import { setShowLoadingScreen } from "redux/ui/slice";
import { throwRandomString } from "utils/string-helper";

export const AppLoadingScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const isShowLoadingScreen = useSelector(
    (state: RootState) => state.ui.isShowLoadingScreen
  );

  useEffect(() => {
    const initTimeout = setTimeout(() => {
      setInitLoading(false);
    }, 2000);

    return () => clearTimeout(initTimeout);
  }, []);

  useEffect(() => {
    if (isShowLoadingScreen) {
      const loadingTimeout = setTimeout(() => {
        dispatch(setShowLoadingScreen(false));
      }, 1000);

      return () => clearTimeout(loadingTimeout);
    }
  }, [dispatch, isShowLoadingScreen]);

  const renderLoadingContent = () => {
    if (!initLoading) {
      return "GDSC";
    }

    return (
      <TextEffect
        initialValue={throwRandomString(INIT_LOADING_CONTENT.length)}
        targetValue={INIT_LOADING_CONTENT}
        effectSpeed={25}
        iterations={1}
      />
    );
  };

  return (
    <AnimatePresence>
      {(initLoading || isShowLoadingScreen) && (
        <motion.div
          variants={loadingContainerVars}
          initial={initLoading ? false : "initial"}
          animate={
            initLoading
              ? {
                  ...loadingContainerVars,
                  transition: undefined,
                }
              : "animate"
          }
          exit="exit"
          style={{
            position: "absolute",
            backgroundColor: "black",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 100,
            zIndex: theme.zIndices.overlay,
          }}
        >
          <motion.div
            variants={loadingContentVars}
            initial={initLoading ? false : "initial"}
            animate={
              initLoading
                ? {
                    ...loadingContainerVars,
                    transition: undefined,
                  }
                : "animate"
            }
            exit="exit"
            style={{ fontSize: "70px", fontWeight: "600" }}
          >
            {renderLoadingContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
