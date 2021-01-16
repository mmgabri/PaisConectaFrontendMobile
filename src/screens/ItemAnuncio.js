function Item({ item }) {
    return (
      <View style={styles.listItem}>
        <Image source={{uri:item.photo}}  style={{width:60, height:60,borderRadius:30}} />
        <View style={{alignItems:"center",flex:1}}>
          <Text style={{fontWeight:"bold"}}>{item.name}</Text>
          <Text>{item.position}</Text>
        </View>
        <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
          <Text style={{color:"green"}}>Call</Text>
        </TouchableOpacity>
      </View>
    );
  }
  