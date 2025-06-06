import {View, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {useLinkBuilder, useTheme} from '@react-navigation/native';
import {Text, PlatformPressable} from '@react-navigation/elements';
// import {MaterialIcons,AntDesign} from '@expo/vector-icons/MaterialIcons';
import {MaterialIcons, AntDesign, FontAwesome5} from '@expo/vector-icons';
import tailwindConfig from "../tailwind.config";
import {useColorScheme} from 'react-native';


export default function TabBar({state, descriptors, navigation}) {
  const theme = useColorScheme();
  const icons = {
    index: (props) => <AntDesign name="home" size={Platform.OS == "android" ? 16 : 26} color={Secondary} {...props} />,
    PastQuestion: (props) => <MaterialIcons name="quiz" size={Platform.OS == "android" ? 16 : 26} color={Secondary} {...props} />,
    news: (props) => <FontAwesome5 name="newspaper" size={Platform.OS == "android" ? 16 : 26} color={Secondary} {...props} />,
    profile: (props) => <AntDesign name="user" size={Platform.OS == "android" ? 16 : 26} color={Secondary} {...props} />,
    chatAi: (props) => <FontAwesome5 name="robot" size={Platform.OS == "android" ? 16 : 26} color={Secondary} {...props} />
  }
  const customColors = tailwindConfig.theme.extend.colors;
  const primary =  customColors.accent
  const Secondary = theme === "dark" ? "white" : "black"
  const {buildHref} = useLinkBuilder();


  return (
    <View style={theme === 'dark' ? styles.tabDark : styles.tabBar}


    >
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;



        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity

            key={route.name}
            style={styles.tabBarItems}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}

          >
            {
              icons[route.name]({
                color: isFocused ? primary : Secondary
              })
            }
            <Text style={{color: isFocused ? primary : Secondary}}

            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {

    position: "absolute",
    bottom: Platform.OS == "android" ? "1" : "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Platform.OS == "android" ? "#f5f3f2" : "#fff",
    marginHorizontal: Platform.OS == "android" ? "" : 20,
    paddingVertical: Platform.OS == "android" ? 5 : 15,
    borderRadius: Platform.OS == "android" ? "" : 25,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    shadowOpacity: 0.2,


  },
  tabDark: {
    position: "absolute",
    bottom: Platform.OS == "android" ? "1" : "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#252231",
    marginHorizontal: Platform.OS == "android" ? "" : 20,
    paddingVertical: Platform.OS == "android" ? 5 : 15,
    borderRadius: Platform.OS == "android" ? "" : 25,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    shadowOpacity: 0.2,



  },
  tabBarItems: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"

  }


})
