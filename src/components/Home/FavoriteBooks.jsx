import { StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"
import { useGetBooksByUserQuery } from "../../services/bookService.js"
import { ScrollHorizontalBooksList } from "./ScrollHorizontalBooksList.jsx"

export const FavoriteBooks = ({ navigation, style }) => {
  const { user } = useSelector(state => state.auth.value)
  const { data: books = [], isLoading } = useGetBooksByUserQuery(user)

  const maxRating = Math.max(...books.map(book => book.starRating || 0), 0)
  const filterFavoriteBooks = books.filter(book => book.starRating === maxRating)

  const handleFavoriteBooksList = () => {
    navigation.navigate("FavoriteBooksList")
  }

  return (
    <View style={[styles.container, style]}>
      {!isLoading &&
        <ScrollHorizontalBooksList
          title="Tus favoritos"
          data={filterFavoriteBooks}
          navigation={navigation}
          onPress={handleFavoriteBooksList}
          noBooksText="No hay libros calificados"
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8
  }
})