// components/MenuModal.tsx

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useNotesStore from '../../store/store';

type MenuModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  position: { top: number; right: number };
  noteId: string;
};

const MenuModal = ({ visible, setVisible, position, noteId }: MenuModalProps) => {
  const { deleteNote } = useNotesStore();

  const handleEdit = () => {
    setVisible(false);
    router.push({ pathname: '/details', params: { noteId } });
  };

  const handleDelete = () => {
    setVisible(false);
    deleteNote(noteId);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}>
      <Pressable style={styles.modalBackdrop} onPress={() => setVisible(false)}>
        {/* The content is now positioned absolutely */}
        <View style={[styles.modalContent, position]}>
          <TouchableOpacity style={styles.modalButton} onPress={handleEdit}>
            <Text style={styles.menuText}>Edit</Text>
            <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.modalButton} onPress={handleDelete}>
            <Text style={[styles.menuText, { color: 'red' }]}>Delete</Text>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1, // Full screen to catch presses anywhere
  },
  modalContent: {
    position: 'absolute', 
    backgroundColor: 'white',
    width: 180, // A fixed width often works best
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#fee8b7',
  },
});

export default MenuModal;