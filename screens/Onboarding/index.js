import { StyleSheet, Text, View,  useWindowDimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedRef, useAnimatedStyle,interpolate, Extrapolate } from 'react-native-reanimated';
import {useCallback} from 'react'

import slides from '../../slides';
import Pagination from '../../components/Pagination/index';
import CustomButton from '../../components/CustomButton/index';
import CustomText from '../../components/Texts/CustomText';



export default function Onboarding() {

   const {width} = useWindowDimensions()
   const x = useSharedValue(0)
   const flatListRef = useAnimatedRef(null)
   const flatListIndex = useSharedValue(0)
   
   const onViewableItemsChanged = useCallback(({viewableItems}) =>{
     flatListIndex.value = viewableItems[0].index;
   })
 
   const onScroll = useAnimatedScrollHandler({
     onScroll: event => {
       x.value = event.contentOffset.x
     }
   })
 
 
   const RenderItem = ({item, index}) =>{
     const imageAnimationStyle = useAnimatedStyle(()=>{
       const opacityAnimation = interpolate(x.value,
         [(index - 1) * width, index * width, (index + 1) * width],
         [0, 1, 0],
         Extrapolate.CLAMP
       )
 
       const translationYAnimation = interpolate(x.value,
         [(index - 1) * width, index * width, (index + 1) * width],
         [100, 0, 100],
         Extrapolate.CLAMP
       )
   
       return {
         opacity: opacityAnimation,
         width: width * 0.9,
         height: width * 0.8,
         resizeMode: 'contain',
         alignSelf:'center',
         transform: [{translateY: translationYAnimation}],
         marginBottom: 30,
         marginTop: 40,
       }
     })
 
     const textAnimationStyle = useAnimatedStyle(()=>{
       const opacityAnimation = interpolate(x.value,
         [(index - 1) * width, index * width, (index + 1) * width],
         [0, 1, 0],
         Extrapolate.CLAMP
       )
 
       const translationYAnimation = interpolate(x.value,
         [(index - 1) * width, index * width, (index + 1) * width],
         [100, 0, 100],
         Extrapolate.CLAMP
       )
   
       return {
         opacity: opacityAnimation,
         transform: [{translateY: translationYAnimation}],
         paddingHorizontal: 20,
       }
     })
 
     return(
       <View style={{width: width}}>
         <Animated.Image 
           source={item.image} 
           style={imageAnimationStyle}
         />
 
         <Animated.View style={textAnimationStyle}>
           {/* <Text style={{fontSize: 32, color:'#001240', marginBottom: 10, fontFamily:'MontBold'}}>{item.title}</Text>
           <Text style={{fontSize: 22, color:'#001240', fontFamily:'Montserrat'}}>{item.desc}</Text> */}
           <CustomText text={item.title} type='bold' style={{fontSize: 30, marginBottom: 11, color:'#001240'}} />
           <CustomText text={item.desc} style={{fontSize: 22, color:'#001240'}}/>
         </Animated.View>
       </View>
     )
   }


   return (
     <View style={styles.container}>
       <Animated.FlatList
         ref={flatListRef}
         onScroll={onScroll}
         data={slides}
         renderItem={({item, index})=> <RenderItem item={item} index={index}/>}
         scrollEventThrottle={16}
         horizontal
         bounces={false}
         pagingEnabled
         showsHorizontalScrollIndicator={false}
         keyExtractor={item => item.id}
         onViewableItemsChanged={onViewableItemsChanged}
       />
 
       <View style={styles.containerRow}>
         <Pagination data={slides} x={x} screenWidth={width}/>
         <CustomButton flatListRef={flatListRef} flatListIndex={flatListIndex} dataLength={slides.length}/>
       </View>
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor:'white'
   },

   containerRow:{
      flex: 1.5,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingHorizontal: 30
   }
 });