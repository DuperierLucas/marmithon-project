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
import { Image, TouchableOpacity, View } from 'react-native';

import Catch from '../screens/Catch';
import NotFoundScreen from '../screens/NotFoundScreen';
import Pokedex from '../screens/Pokedex';
import Home from '../screens/Home';
import {
    RootStackParamList,
    RootTabParamList,
    RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Team from '../screens/Team';
import Login from '../screens/Login';
import { colors } from '../styles/shared/Color';
import styles from '../styles/navigation.style'

const GRASS_ICON = require('../assets/images/grass.png')

export default function Navigation() {
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
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name="Catch"
                    component={Catch}
                    options={() => ({
                        title: 'Capturer',
                    })}
                />
            </Stack.Group>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: 'Connexion' }}
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
                tabBarActiveTintColor: colors.main.pink,
            }}
        >
            <BottomTab.Screen
                name="Favorites"
                component={Pokedex}
                options={() => ({
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
                    title: 'Accueil',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="home" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Team"
                component={Team}
                options={({ navigation }: RootTabScreenProps<'Team'>) => ({
                    title: 'Mon Équipe',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="pokeball" size={30} color={color} />
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Catch')}
                            style={styles.iconContainer}
                            activeOpacity={0.7}
                        >
                            <Image source={GRASS_ICON} style={styles.icon}/>
                        </TouchableOpacity>
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
