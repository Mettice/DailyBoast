import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Folder, X, Edit2, Save } from 'lucide-react';
import { useEngagementStore } from '../../store/useEngagementStore';
import type { Collection } from '../../types/engagements';

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, description);
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Create Collection</h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collection Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Create Collection
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const CollectionsView: React.FC = () => {
  const { collections, createCollection } = useEngagementStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">My Collections</h2>
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          New Collection
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <motion.div
            key={collection.id}
            className="bg-white p-4 rounded-xl shadow-sm"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Folder className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{collection.name}</h3>
                <p className="text-sm text-gray-600">{collection.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {collection.compliments.length} compliments
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <CreateCollectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={createCollection}
      />
    </div>
  );
};