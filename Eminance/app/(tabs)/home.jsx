import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import {getAllPosts, getLatestPosts}  from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import PostsCard from '../../components/PostsCard'

const Home = () => {
  
  const {data: posts, refetch} = useAppwrite(getAllPosts)

  console.log("Posts: ", posts)

  const {data: Latestposts} = useAppwrite(getLatestPosts)

  // console.log("Data: ", posts)

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    // recall Videos -> if any new Videos appeared
    await refetch();
    setRefreshing(false)
  }

  const { user } = useGlobalContext();

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          // <Text key={item.id.toString()} className='text-3xl text-white'>{item.name}</Text>
          <PostsCard itemdata={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user? user.username: ""}
                </Text>
              </View>
              <View>
                <Image source={images.logoSmall} className="w-9 h-10" resize="contain" />
              </View>
            </View>
            <SearchInput placeholder="Search for Drone Ideas" />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg fornt-pregular mb-3">
                Latest Ideas
              </Text>
              <Trending posts={Latestposts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={(
          <EmptyState title="No Ideas Found" subtitle="Be the first one to Add the data" />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Home