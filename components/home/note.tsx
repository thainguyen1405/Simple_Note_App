import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DEFAULT_ICON_SIZE } from '../../core/constants';
import useNotesStore from '../../store/store';

type NoteProps = {
  item: {
    id: string;
    title: string;
  };
};

const Note = ({ item }: NoteProps) => {
  const { deleteNote } = useNotesStore();
  const [modalVisible, setModalVisible] = useState(false); 

  const handleEdit = () => {
    setModalVisible(false); // Close modal first
    router.push({ pathname: '/details', params: { noteId: item.id } });
  };

  const handleDelete = () => {
    setModalVisible(false); 
    deleteNote(item.id);
  };

  return (
    <>
      <View style={styles.container}>
        <View className="flex w-full flex-row items-center justify-between px-10">
          <Text className="text-2xl">{item.title}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="ellipsis-vertical" size={DEFAULT_ICON_SIZE} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade" // 'fade' is a bit more subtle than 'slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setModalVisible(false)}>
        {/* Use a Pressable with no onPress to prevent closing when tapping the modal content */}
          <Pressable>
            <View style={styles.modalContent}>
              {/* Edit Button */}
              <TouchableOpacity style={styles.modalButton} onPress={handleEdit}>
                <Text style={styles.menuText}>Edit</Text>
                <Ionicons name="add-circle-outline" size={24} color="#2443F2" />
              </TouchableOpacity>
            <View style={styles.separator} />

            {/* Delete Button */}
            <TouchableOpacity style={styles.modalButton} onPress={handleDelete}>
              <Text style={[styles.menuText, { color: 'red' }]}>Delete</Text>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default Note;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#fee8b7',
    borderRadius: 16,
    // You can adjust these styles as needed
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center', // Center the modal vertically
    alignItems: 'center',     // Center the modal horizontally
  },
  modalContent: {
    marginTop: 500, // Position the modal absolutely
    backgroundColor: 'white',
    width: 350, // A fixed width often works best
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5,
  },
  modalButton: {
    flexDirection: 'row',       
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 46,
  },
  menuText: {
    fontSize: 17,
  },
  separator: {
    height: 1,
    backgroundColor: '#fee8b7',
  },
});