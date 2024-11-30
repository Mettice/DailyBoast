import { Compliment } from '../types';

interface ShareOptions {
  platform: 'twitter' | 'facebook' | 'linkedin' | 'whatsapp' | 'telegram' | 'email' | 'copy' | 'download';
  compliment: Compliment;
  imageUrl?: string;
}

export class SharingService {
  private static getShareUrls(text: string, imageUrl?: string) {
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(window.location.href);
    const encodedImage = imageUrl ? encodeURIComponent(imageUrl) : '';

    return {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=Daily%20Joy&summary=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      email: `mailto:?subject=A%20Compliment%20for%20You&body=${encodedText}%0A%0A${encodedUrl}`,
      download: ''
    };
  }

  static async share({ platform, compliment, imageUrl }: ShareOptions): Promise<boolean> {
    const shareText = `${compliment.text} ✨ \n\nShared via Daily Joy`;
    
    try {
      // Try native share if available
      if (navigator.share && platform !== 'copy') {
        try {
          await navigator.share({
            title: 'Daily Joy Compliment',
            text: shareText,
            url: window.location.href,
          });
          return true;
        } catch (error) {
          console.log('Native share failed, falling back to custom share');
        }
      }

      // Platform-specific sharing
      switch (platform) {
        case 'copy': {
          await navigator.clipboard.writeText(shareText);
          return true;
        }
        
        case 'email': {
          const emailUrl = this.getShareUrls(shareText)[platform];
          window.location.href = emailUrl;
          return true;
        }
        
        default: {
          const shareUrl = this.getShareUrls(shareText, imageUrl)[platform];
          const windowFeatures = 'width=600,height=400,menubar=no,toolbar=no,status=no';
          window.open(shareUrl, 'share', windowFeatures);
          return true;
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
      return false;
    }
  }
}