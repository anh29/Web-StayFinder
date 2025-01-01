import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Box,
  IconButton,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { UserReview } from "types/user";
import { reviewByRoomId } from "api/userService"; // This function will be modified to handle FormData

interface ReviewModalProps {
  roomId: string;
  orderDetails: {
    hotelName: string;
    checkInDate: string;
    checkOutDate: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted: () => void; // Callback after review submission
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  roomId,
  orderDetails,
  isOpen,
  onClose,
  onReviewSubmitted,
}) => {
  const toast = useToast();

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [uploadPreview, setUploadPreview] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRating = (rate: number) => setRating(rate);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadPreview(files);
    }
  };

  const handleSubmitReview = async () => {
    setIsSubmitting(true);

    // Create a FormData object to send the review data
    const formData = new FormData();
    formData.append("roomId", roomId);
    formData.append("rating", rating.toString());
    formData.append("comment", comment);

    // Append the media (images) to the FormData
    uploadPreview.forEach((file) => {
      formData.append("media", file); // Add files to the "media" key
    });

    try {
      await reviewByRoomId(formData); // Send FormData

      toast({
        title: "Review Submitted",
        description: "Thank you for your review!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onReviewSubmitted(); // Notify the parent component
      onClose(); // Close the modal
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Unable to submit your review. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Write a Review for {orderDetails.hotelName}
          <Text fontSize="sm" color="gray.500">
            (Check-in: {new Date(orderDetails.checkInDate).toLocaleDateString()} - Check-out: {new Date(orderDetails.checkOutDate).toLocaleDateString()})
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Rating</FormLabel>
            <Box display="flex" gap={2}>
              {[1, 2, 3, 4, 5].map((star) => (
                <IconButton
                  key={star}
                  icon={<FaStar />}
                  aria-label={`Rate ${star}`}
                  colorScheme={rating >= star ? "yellow" : "gray"}
                  onClick={() => handleRating(star)}
                />
              ))}
            </Box>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Comment</FormLabel>
            <Textarea
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Upload Proof</FormLabel>
            <Input type="file" accept="image/*" multiple onChange={handleMediaChange} />
            <Box display="flex" mt={2} gap={2} flexWrap="wrap">
              {uploadPreview.map((file, index) => (
                <Image
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  boxSize="80px"
                  objectFit="cover"
                  borderRadius="md"
                />
              ))}
            </Box>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmitReview}
            isLoading={isSubmitting}
          >
            Submit Review
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewModal;
