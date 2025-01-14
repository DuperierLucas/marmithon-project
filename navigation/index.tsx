/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import NotFoundScreen from '../screens/NotFoundScreen';
import Pokedex from '../screens/Pokedex';
import Home from '../screens/Home';
import { RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Team from '../screens/Team';
import { colors } from '../styles/shared/Color';
import styles from '../styles/navigation.style';
import FightModal from '../modals/FightModal';
import { LinearGradient } from 'expo-linear-gradient';
import chroma from 'chroma-js';
import Settings from '../screens/Settings';
import CatchModal from '../components/modals/CatchModal';

export default function Navigation(): JSX.Element {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={DefaultTheme}
        >
            <RootNavigator />
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ title: 'Oops!' }}
            />
            <Stack.Screen
                name={'Fight'}
                component={FightModal}
                options={() => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name={'Catch'}
                component={CatchModal}
                options={() => ({
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name={'Settings'}
                component={Settings}
                options={() => ({
                    headerShown: true,
                })}
            />
        </Stack.Navigator>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: colors.main.yellow,
                tabBarInactiveTintColor: chroma(colors.main.white)
                    .alpha(0.5)
                    .css(),
                // eslint-disable-next-line react/display-name
                tabBarBackground: () => (
                    <LinearGradient
                        colors={[
                            chroma(colors.main.black).alpha(0.2).css(),
                            colors.main.black,
                        ]}
                        style={{
                            height: '100%',
                        }}
                    />
                ),
                tabBarStyle: {
                    position: 'absolute',
                },
            }}
        >
            <BottomTab.Screen
                name="Favorites"
                component={Pokedex}
                options={() => ({
                    headerShown: false,
                    title: 'Pokédex',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="star" color={color} />
                    ),
                })}
            />
            <BottomTab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    title: 'Accueil',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="home" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Team"
                component={Team}
                options={() => ({
                    title: 'Equipe',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="pokeball"
                            size={30}
                            color={color}
                        />
                    ),
                    headerStyle: styles.headerRightContainer,
                })}
            />
        </BottomTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
